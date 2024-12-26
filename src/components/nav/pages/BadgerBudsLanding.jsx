import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBudsLanding(props) {

    return <div>
        <h1>About Badger Buddies!</h1>
        <br/>
        <Container fluid={true}>
            <Row>
                <Col xs={12} lg={4} xl={6}>
                    <p>Badger Buddies is a proxy website (built by you!) for cats on <a target="_blank" href="http://www.csapa.org/index.jhtml">The Madison Cat Project</a>.</p>
                    <p>This information is current as of <strong>February 26th, 2024.</strong></p>
                    <p>Interested in adopting a cat? <a target="_blank" href="http://www.csapa.org/basezoo/index.htm">See them here!</a></p>
                    <h3>From the Madison Cat Project...</h3>
                    <p>"Madison Cat Project saves cats through partnerships with other shelters and our community. Whether it's partnering with area shelters to bring in cats who need another chance or supporting farmers and other folks who need help managing their outdoor cat colonies by offering affordable spay/neuter surgeries and rehoming options, we help hundreds of cats (and people) each year!"</p>
                </Col>
                <Col xs={12} lg={8} xl={6}>
                <iframe width="100%" height="100%" src="//player.bilibili.com/player.html?isOutside=true&aid=33662651&bvid=BV1ot411f7S1&cid=58937116&p=1&autoplay=false" scrolling="no" border="0" frameBorder="no" framespacing="0" allowFullScreen={true}></iframe>
                </Col>
            </Row>
        </Container>
    </div>
}

/*
a标签中 target="_blank"表示在新标签页打开这个 URL */

/* 原元素 <iframe width="560" height="315" src="https://www.youtube.com/embed/RK65p_-n3z0?si=ta9VsCE5d72Sjtk6" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */
/*<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=33662651&bvid=BV1ot411f7S1&cid=58937116&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>*/

/*
iframe用于嵌入另一个网页中的内容
属性上网搜
*/

/*
在Bootstrap框架中，container元素是用来创建响应式布局的容器，控制页面的宽度。在container上设置 fluid 属性可以使容器宽度响应式地适应不同屏幕宽度。    fluid={true}：

当 fluid 设置为 true 时，容器的宽度会 始终填满整个可用的屏幕宽度，即宽度为 100%。                           
当fluid={false} 或没有设置时，容器的宽度是固定的，并且会在不同的屏幕尺寸下有不同的最大宽度。
Bootstrap 的默认 container 会根据屏幕大小限制最大宽度，通常会在特定断点处改变宽度            
*/

/*
原来的代码
import { Col, Container, Row } from "react-bootstrap";

export default function BadgerBudsLanding(props) {

    return <div>
        <h1>About Badger Buddies!</h1>
        <br/>
        <Container fluid={true}>
            <Row>
                <Col xs={12} lg={4} xl={6}>
                    <p>Badger Buddies is a proxy website (built by you!) for cats on <a href="https://www.madisoncatproject.org/">The Madison Cat Project</a>.</p>
                    <p>This information is current as of <strong>February 26th, 2024.</strong></p>
                    <p>Interested in adopting a cat? <a target="_blank" href="https://www.madisoncatproject.org/browse-indoor">See them here!</a></p>
                    <h3>From the Madison Cat Project...</h3>
                    <p>"Madison Cat Project saves cats through partnerships with other shelters and our community. Whether it's partnering with area shelters to bring in cats who need another chance or supporting farmers and other folks who need help managing their outdoor cat colonies by offering affordable spay/neuter surgeries and rehoming options, we help hundreds of cats (and people) each year!"</p>
                </Col>
                <Col xs={12} lg={8} xl={6}>
                <iframe width="100%" height="100%" src="//player.bilibili.com/player.html?isOutside=true&aid=33662651&bvid=BV1ot411f7S1&cid=58937116&p=1&autoplay=false" scrolling="no" border="0" frameBorder="no" framespacing="0" allowFullScreen={true}></iframe>
                </Col>
            </Row>
        </Container>
    </div>
}
*/