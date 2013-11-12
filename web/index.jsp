<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <script src="js/jquery.js"></script>
        <script src="js/heartbeat.js"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <link type="text/css" href="css/my.css" rel="stylesheet" />

    </head>
    <body>
        <div id="main_title">Heart Of Glass</div>
        <div id="number_title"></div>
        <div id="number">0</div>
        <div id="log"></div>

        <img src="images/heart.png" id="himage"/>

        <canvas id="draw" width="1000" height="550">
            <p>Your browser doesn't support canvas.</p>
        </canvas>

        <script>

            $(document).ready(function() {
                start();

            });

        </script>

    </body>
</html>
