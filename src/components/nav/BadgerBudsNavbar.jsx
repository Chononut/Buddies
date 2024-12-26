import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png'

export default function BadgerBudsNavbar(props) {
    return <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect={false}>
        <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand as={Link} to="/">
                <img
                    alt="Badger Buddies Logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Badger Buddies!
            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/available-cats">Available Cats</Nav.Link>
                    <Nav.Link as={Link} to="/basket">My Basket</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

//默认情况下，Nav.Link渲染<a>标签，使用as={Link}后，会渲染为react-router-dom 提供的 <Link> 组件，从而支持单页应用（SPA）的导航功能。
//to 属性是 react-router-dom 的 Link 组件的专属属性。如果不使用 as={Link}，to 属性将无效（因为普通的 <a> 标签不支持 to 属性）。
/* 必须使用 as 的场景:
如果你希望 Nav.Link 具备 react-router-dom 的 Link 导航功能（如单页导航、不刷新页面更新 URL），as={Link} 是必须的。
直接使用 <Nav.Link> 而不指定 as={Link} 会导致 to 属性无法生效。
2. 不需要 as 的场景:
如果你不需要导航功能，仅仅是为了显示一个不可交互的链接或按钮，你可以省略 as，直接使用 Nav.Link 或其他普通的 HTML 元素（如 <a>、button）。
如果你的项目不使用 react-router-dom 或其他路由库，你也不需要 as={Link}。
替代方案
*/

/*
如果不想使用 as 属性，也可以直接使用 react-router-dom 的 Link，例如：
<Link to="/about-us" className="nav-link">About Us</Link>
但是这种方式会失去 Nav.Link 提供的样式和功能（如 Bootstrap 的样式），所以还是推荐使<Nav.Link标签>。
Nav.Link（通过 as={Link}）本质上是 Link 的增强版，Nav.Link会修改浏览器的 URL，而不刷新页面，这是单页应用（SPA）的核心特性。点击导航链接后，Route 会根据新的 URL 去匹配路径，并决定要渲染哪个组件。
*/


/*
variant: 设置导航栏的颜色主题。常见的值有 light 和 dark。这会影响导航栏的背景色和文本色。                                                    
sticky: 使导航栏在滚动时固定在页面顶部。使用时可以设置为 top，让导航栏固定在页面顶部，即便用户滚动页面时。                                        
expand: 控制导航栏在不同屏幕尺寸下的展开行为。通常设置为 lg、md 等，表示当屏幕尺寸达到某个阈值时导航栏会展开。
collapseOnSelect = {true}  默认值为 true 用于缩小到一定程度出现导航栏后 ，点击导航栏的按钮时，导航栏自动折叠 值为false 表示不会自动折叠
{' '} 在 JSX 中是一个表达式，表示一个空格字符。在 JSX 中不能直接写空格，因为它会被当作无效的文本，所以通过 {' '} 来插入一个空格字符。
Navbar.Brand 用于创建导航栏（Navbar）中的品牌标识部分，通常显示为一个 logo 或 标题，并可以包含超链接。
Navbar.Collapse 用来包裹可折叠的导航项。当屏幕宽度较小时，Navbar.Collapse 会将导航项折叠成一个按钮，用户点击按钮可以展开导航项。
Navbar.Toggle 表示 当页面缩小到Navbar的expand的值时 展示导航栏 aria-controls的值用于 和 Navbar.Collapse的id对应 自动设置为按钮 这些按钮可以导航到Navbar.Collapse中的Nav的页面
*/
