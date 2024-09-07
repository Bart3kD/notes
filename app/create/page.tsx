import NavigateButton from "../components/navigateButton";

export default function Home() {
  return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-bgColor">
        <NavigateButton to="make" />
      </div>
  );
}
