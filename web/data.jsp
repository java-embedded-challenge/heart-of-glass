<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.IOException"%>
<%@page import="org.things.Things"%>
<%@page import="org.things.device.SerialDevice"%>
<%@page import="org.things.Device"%>
<%@page import="org.unitsofmeasurement.demo.health.Health"%>
<%@page import="org.unitsofmeasurement.demo.health.HeartRateAmount"%>
<%!    private static Device things;
    private static boolean inited = false;
    private static String porta = "/dev/ttyUSB0";
    private static final List<HeartRateAmount> stack = new ArrayList<HeartRateAmount>();

    public static void put(HeartRateAmount a) {
        if (stack.size() > 30) {
            stack.remove(0);
        }
        stack.add(a);
    }  

    public static void init(String porta) throws Exception {
//		things = new SerialDevice(porta, 9600);
//		things.open();
        System.setProperty("gnu.io.rxtx.SerialPorts", porta);
        System.out.println("starting");
        Things.delay(1500);

        new Thread() {
            public void run() {

                while (true) {
                    try {
                        HeartRateAmount result = read();
                        //     fc = read(); 

                        put(result);
                        System.out.println("Reading " + result);
                        Thread.sleep(1000);
                    } catch (Exception e) {
                    }
                }
            }
        }.start();
    }
    public static int last = 0;

    public static HeartRateAmount read() throws IOException, Exception {
        if (things == null) {
            if (last == 0) {
                last = (int) (Math.random() * 40 + 60);
              }
            if(last>300)last=0;
            return HeartRateAmount.of(Integer.valueOf(last += (int) (Math.random() * 10 - 5)), Health.BPM);
        }
        //Device things = new SerialDevice(porta, 9600);
        //things.open();
        //Things.delay(1500);
        things.send("G1\r");
        Things.delay(100);

        String s = things.receive();
        String heartbeat = null;

        if (s != null) {
            return HeartRateAmount.of(Integer.valueOf(s.split(" ")[2]), Health.BPM);
            //	fc = new FrequenciaCardiaca();
        } else {
            throw new Exception("The sensor returned null.");
        }
        //things.close();
    }

    public static void encerrar() throws Exception {
        things.close();
    }
%>
<%
    if (!inited) {
        init(porta);
        inited = true;
    }
%>
[
<%
    for (int i = 0; i < stack.size(); i++) {
%><%=stack.get(i).getValue().intValue()%><%
    if (i < stack.size() - 1) {%>,<%}
    }
%>
]