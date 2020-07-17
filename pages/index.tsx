import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
// Custom DatePicker that uses Day.js instead of Moment.js
import AddNoteDrawerForm from '../components/AddNoteDrawerForm';
import NotesCard from '../components/NotesCard';



const content = {  
  padding: 24, minHeight: 780 ,
}

export default function Home() {
  return (
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
      <div className="logo">
        Axiom Notes App
      </div>
        </Header>
      
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={content}>
        <AddNoteDrawerForm />
        <NotesCard />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Axiom Note App ©2018 Created by Subhash Raj </Footer>
    </Layout>
  )
}
