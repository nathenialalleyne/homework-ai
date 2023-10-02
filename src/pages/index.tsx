import Grid from './landing/grid'
import LandingFollow from './landing/mousefollow';
export default function Home() {

  return (
    <div className="w-screen h-screen bg-stone-900 overflow-hidden relative">
      <Grid />
      <LandingFollow />
    </div>
  );
}
