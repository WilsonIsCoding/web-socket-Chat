# web-socket-Chat
<p>有別於http請求，websocket是一個雙向請求，伺服器能主動跟客戶端去做溝通。</p>
<p>這個作品的小demo是透過ws這個套件搭配前端手刻html製作的，可以在同一台電腦中開許多分頁來模擬不同用戶的聊天室對話。</p>
<p>當然！也有做基本的防呆，原本有一個小問題是，今天server端接收到一個Message請求後，會回傳給每一個開啟了這個ws的client，而我們則需要想辦法去做辨識，知道哪一個使用者是訊息的「發出者」、而哪一「些」使用者則是這些訊息的「接收者」，這是一個很有趣的一件事情，我的解法是去抓req裡面的header做ID，其實是可以透過bcrypt去做加密，但這影響不太大，所以就我就沒有做，然後使用者的名稱也需要在connect 時去建立，並讓其他使用者知道 用戶+1(當然disconnect時也需要-1)</p>

<p>講了這麼多，就直接來玩玩看吧！</p>

<h3>1.先安裝一下node package</h3>

`npm i`

<h3>2.透過nodemon來啟動專案</h3>

`npm run server`

理想上應該可以成功打開你的8080 PORT


<img width="332" alt="截圖 2023-12-22 下午5 08 51" src="https://github.com/WilsonIsCoding/web-socket-Chat/assets/145327952/4fdf2b65-ef74-4e83-8289-f775adfc7c63">

接著進入到index.html裡面按下go live

<img width="1102" alt="截圖 2023-12-22 下午5 11 12" src="https://github.com/WilsonIsCoding/web-socket-Chat/assets/145327952/5a323310-938e-47bd-bf5e-6410542c245e">

按下上面的start chat，你就成功透過本地的local server建立一個用戶囉！

<img width="256" alt="截圖 2023-12-22 下午5 12 42" src="https://github.com/WilsonIsCoding/web-socket-Chat/assets/145327952/a33acdf2-69a0-4549-a459-708411e27201">

你也可以修改上面的名字(default是anonymous），但同名自也不會出錯，因為畫面渲染是認ID的！！！

<img width="435" alt="截圖 2023-12-22 下午5 16 31" src="https://github.com/WilsonIsCoding/web-socket-Chat/assets/145327952/33137e7e-656d-468d-9ca3-4a893d0d0c84">

開啟兩個分頁來玩玩看對話視窗！

<img width="1379" alt="截圖 2023-12-22 下午5 14 58" src="https://github.com/WilsonIsCoding/web-socket-Chat/assets/145327952/0003d89a-4597-4290-85a5-8e8a067c986a">
