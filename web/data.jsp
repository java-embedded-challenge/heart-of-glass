<%@page import="java.util.ArrayList"%>
<%@page import="java.io.IOException"%>
<%@page import="org.things.Things"%>
<%@page import="org.things.device.SerialDevice"%>
<%@page import="org.things.Device"%>
<%!    private static Device things;
    private static int inited = 0;
    private static String porta = "/dev/ttyUSB0";
    private static final ArrayList<Integer> stack = new ArrayList<Integer>();

    public static void put(int e) {
        if (stack.size() > 30) {
            stack.remove(0);
        }
        stack.add(e);
    }  

    public static void iniciar(String porta) throws Exception {
//		things = new SerialDevice(porta, 9600);
//		things.open();
        System.setProperty("gnu.io.rxtx.SerialPorts", porta);
        System.out.println("starting");
        Things.delay(1500);

        new Thread() {
            public void run() {

                while (1 == 1) {
                    try {
                        int leer = ler();
                        //     fc = ler(); 


                        put(leer);
                   //     System.out.println("inserting");
                        Thread.sleep(1000);
                    } catch (Exception e) {
                    }

                }

            }
        }.start();


    }
    public static int last = 0;

    public static int ler() throws IOException, Exception {
        if (things == null) {
            if (last == 0) {
                last = (int) (Math.random() * 40 + 50);
            }
            if(last>300)last=0;
            return last += (int) (Math.random() * 20 - 5);
        }
        //Device things = new SerialDevice(porta, 9600);
        //things.open();
        //Things.delay(1500);
        things.send("G1\r");
        Things.delay(100);

        String s = things.receive();
        String batimento = null;

        if (s != null) {
            return Integer.valueOf(s.split(" ")[2]);
            //	fc = new FrequenciaCardiaca();
        } else {
            throw new Exception("O sensor retornou nulo.");
        }
        //things.close();

    }

    public static void encerrar() throws Exception {
        things.close();
    }


%>
<%
    if (inited == 0) {
        iniciar(porta);
        inited = 1;
    }



%>
[
<%
    for (int i = 0; i < stack.size(); i++) {
%><%=stack.get(i)%><%
    if (i < stack.size() - 1) {%>,<%}
    }

%>
]