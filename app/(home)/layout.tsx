import Header from "../components/header";
import TabBar from "../components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <TabBar />
    </div>
  );
}
