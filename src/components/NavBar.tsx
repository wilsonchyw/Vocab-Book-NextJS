import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import PerPageDropdown from "components/datalist/PerPageDropdown";
//import Profile from 'components/Profile';
import { toggleCreate } from 'components/slices/dialogSlice';
import { changeOrderType, changePerPage } from 'components/slices/listSlice';
import { toggleDialog } from "components/slices/userSlice";
import { toggleVisable } from "components/slices/visableSlice";
import useAgent from "lib/useAgent";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { FunctionComponent } from 'react';
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

const Profile = dynamic(()=>import('components/Profile'))
const PerPageDropdown = dynamic(()=>import('components/datalist/PerPageDropdown'))

const NavBar: FunctionComponent = () => {
    const route = useRouter()
    const dispatch = useDispatch()
    const isMobile = useAgent()
    const setPerPage = (value: number) => dispatch(changePerPage(value))
    const newVocab = () => {
        if (route.pathname!="/vocab") route.push("vocab")
        dispatch(toggleCreate())
    }
    const [vocabVisable, meaningVisable] = useSelector((state: RootState) => [state.visable.vocab, state.visable.meaning])

    if (isMobile) return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand onClick={()=>route.push("/")}>Vocabsitory</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="" onClick={newVocab}>New</Nav.Link>
                    <Nav.Link href="" onClick={() => dispatch(changeOrderType("random"))}>Shuffle</Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" >
                            <span>Toggle</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark" style={{minWidth:"90px"}}>
                            <Dropdown.Item >                                
                                <div className={vocabVisable ? "text-white" : "text-secondary"} onClick={() => dispatch(toggleVisable('vocab'))}>Vocab</div>
                                <div className={meaningVisable ? "text-white" : "text-secondary"} onClick={() => dispatch(toggleVisable('meaning'))}>Meaning</div>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="" onClick={() => dispatch(toggleDialog())}> <AccountCircleIcon /></Nav.Link>
                </Nav>
            </Container>
            <Profile />
        </Navbar >
    )

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container className="p-0">
                <Navbar.Brand onClick={()=>route.push("/")}>Vocabsitory</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="" onClick={newVocab}>New</Nav.Link>
                    <Nav.Link href="" onClick={() => dispatch(changeOrderType("random"))}>Shuffle</Nav.Link>
                    <Nav.Link href="" className={vocabVisable ? "text-white" : "text-secondary"} onClick={() => dispatch(toggleVisable('vocab'))}>Vocab</Nav.Link>
                    <Nav.Link href="" className={meaningVisable ? "text-white" : "text-secondary"} onClick={() => dispatch(toggleVisable('meaning'))}>Meaning</Nav.Link>
                    {!isMobile && <PerPageDropdown handleNumChange={setPerPage} />}
                </Nav>
                <Nav>
                    <Nav.Link href="" onClick={() => dispatch(toggleDialog())}> <AccountCircleIcon /></Nav.Link>
                </Nav>
            </Container>
            <Profile />
        </Navbar >
    )
}

export default NavBar