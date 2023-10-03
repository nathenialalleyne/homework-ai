import Grid from './landing/grid'
import LandingHeading from './landing/heading';
import LandingHeader from './landing/header';

export default function Home() {

  return (
    <div className="w-screen h-screen bg-stone-900 overflow-hidden">
      <LandingHeader />
      <LandingHeading />
      <Grid />
    </div>
  );
}
