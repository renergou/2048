关于Web socket技术报告
===================
                
                
     WebSocket协议是基于TCP的一种新的网络协议它实现了浏览器与服务器全双工(full-duplex)通信——允许服务器主动发送信息给客户端

----------


##web socket的产生背景
---
    长久以来, 创建实现客户端和用户端之间双工通讯的web app都会造成HTTP轮询的滥用: 客户端向主机不断发送不同的HTTP呼叫来进行询问。
> **产生问题:**

> - 服务器被迫为每个客户端使用许多不同的底层TCP连接：一个用于向客户端发送信息，其它用于接收每个传入消息
> - 有线协议有很高的开销，每一个客户端和服务器之间都有HTTP头
> - 客户端脚本被迫维护从传出连接到传入连接的映射来追踪回复


##web socket协议
---
    WebSocket 协议本质上是一个基于 TCP 的协议。为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息”Upgrade: WebSocket”表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

##web socket与http的区别
---
     WebSocket是HTML5出的协议，也就是说HTTP协议没有变化但HTTP是不支持持久连接的（长连接，循环连接的不算）
       
    首先HTTP有 1.1 和 1.0 之说，也就是所谓的 keep-alive ，把多个HTTP请求合并为一个，但是 Websocket 其实是一个新协议，跟HTTP协议基本没有关系，只是为了兼容现有浏览器的握手规范而已，也就是说它是HTTP协议上的一种补充，有交集，但是并不是全部
    
     另外Html5是指的一系列新的API，或者说新规范，新技术。Http协议本身只有1.0和1.1，而且跟Html本身没有直接关系。通俗来说，你可以用HTTP协议传输非Html数据，就是这样

##web socket的优点
---
    在实现websocket连线过程中，需要通过浏览器发出websocket连线请求，然后服务器发出回应，这个过程通常称为“握手” 。在 WebSocket API，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

> **websocket的两大好处:**
>1. Header
互相沟通的Header是很小的-大概只有 2 Bytes
2. Server Push
服务器的推送，服务器不再被动的接收到浏览器的请求之后才返回数据，而是在有新数据时就主动推送给浏览器。


##web socket的作用
---
        在讲Websocket之前，可以先了解一下 long poll 和 ajax轮询 的原理，这样比较着可以更好的了解到web socket的强大之处

> **ajax轮询**

>拟人场景：

>客户端：有没有新信息啊(Request)

>服务端：没有（Response）（表情高冷）

>客户端：有没有新信息啊(Request)

>服务端：没有（Response）（表情高冷又严肃）

>客户端：有没有新信息(Request)

>服务端：你好烦啊，没有（Response）（表情凝重）

>客户端：有没有新消息啊（Request）

>服务端：好啦好啦，有啦给你。（Response）(表情释然）

>客户端：有没有新消息（Request）

>服务端：没有（Response） （一脸无奈）

    long poll 其实原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起连接后，如果没消息，就一直不返回Response给客户端。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始。

> **long poll**

>拟人场景：

>客户端：有没有新信息，没有的我就等着你（Request）
--------------等待ing

>服务端：有消息了， 给你（Response）


    从上面很容易看出来，不管怎么样，上面这两种都是非常消耗资源的。

    ajax轮询 需要服务器有很快的处理速度和资源。（速度）long poll 需要有很高的并发，也就是说同时接待客户的能力。（场地大小）
    
所以接下来我们来看看web socket
> **Web socket**

>拟人场景：

>客户端：hi,boy1我要建立Websocket协议，需要的服务：chat，Websocket协议版本：17（HTTP Request）

>服务端：ok，确认，已升级为Websocket协议（HTTP Protocols Switched）

>客户端：麻烦你有信息的时候推送给我噢。。

>服务端：ok，有的时候会告诉你的。

>服务端：12345

>服务端：上山打老虎

>服务端：老虎打不着

>服务端：打了个小松鼠

相信大家应该可以感受到不同，并且 WebSocket 的强大
> **Tip:** 如果想要深刻的感受到轮询和 WebSocket 的区别可以在**WebSocket 的拯救**查看 [ 轮询和 WebSocket 实现方式的网络负载对比图](https://www.ibm.com/developerworks/cn/web/1112_huangxa_websocket/).

##web socket当前的浏览器支持
---
| 浏览器 | 支持情况 |
| ------------------
| Chrome /Firefox       | supported in version 4+ |
| Internet Explorer/Opera  |supported in version 10+|
|Safari |supported in version 5+ |


##web socket握手
---
我们来看个典型的 Websocket 握手
> GET /chat HTTP/1.1

>Host: server.example.com

>Upgrade: websocket

>Connection: Upgrade

>Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==

>Sec-WebSocket-Protocol: chat, superchat

>Sec-WebSocket-Version: 13

>Origin: http://example.com

下面这个就是Websocket的核心
>Upgrade: websocket

>Connection: Upgrade

告诉 Apache 、 Nginx 等服务器：注意啦，我发起的是Websocket协议
服务器

>Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==

>Sec-WebSocket-Protocol: chat, superchat

>Sec-WebSocket-Version: 13

    Sec-WebSocket-Key 是一个 Base64 encode 的值，后面的值是浏览器随机生成的，告诉服务器：要验证是不是真的是Websocket助理

    Sec_WebSocket-Protocol 是一个用户定义的字符串，用来区分同URL下，不同的服务所需要的协议。简单理解：今晚我要Websocket来服务，别搞错啦~

    Sec-WebSocket-Version 是告诉服务器所使用的 Websocket Draft （协议版本）

    然后服务器会返回下列东西，表示已经接受到请求， 成功建立Websocket啦！

>HTTP/1.1 101 Switching Protocols

>Upgrade: websocket

>Connection: Upgrade

>Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=

>Sec-WebSocket-Protocol: chat

    Sec-WebSocket-Accept 这个则是经过服务器确认，并且加密过后的 Sec-WebSocket-Key 

    Sec-WebSocket-Protocol 则是表示最终使用的协议。

    至此，HTTP已经完成它所有工作了，接下来就是完全按照Websocket协议进行了
    
    
 关于我
                                                   
                                                                 班级：软件1401
                                                                 学号：31401286
                                                                 姓名：竹甜钿


