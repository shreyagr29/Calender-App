import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;