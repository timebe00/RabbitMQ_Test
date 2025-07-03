const WebSocket = require("ws");

module.exports = function (server) {
    const wss = new WebSocket.Server({ server });
    // WebSocket 연결 처리
    wss.on("connection", (ws) => {
        console.log("클라이언트 연결됨");

        ws.on("message", (message) => {
            console.log("수신:", message.toString('utf8'));

            // 브로드캐스트
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
        });

        ws.on("error", (error) => {
            console.log("error : ", error);
        })

        ws.on("close", () => {
            console.log("서버와 접속이 끊어졌습니다.")
        })

        ws.send("서버에 연결되었습니다.");
    });
}