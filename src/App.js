import React, { useEffect, useRef } from 'react';
//import Sim from "./main";
import VerticalSlider from "./Slider";
import './App.css';


function App() {

  const leftTicks = {
    writingMode: "vertical-lr",
     direction: "ltr",
  }

  const rightTicks = {
    writingMode: "vertical-lr",
     direction: "ltr",
  }

  return (

      

      <div className ="UI">

        <div className ="timeContainer">

            <div className ="timeData">
                
                <h3 id="realTimeElapsed">totTime: 00.00.00</h3>
                <h3 id="simTimeElapsed">totSimTime: 0.000*10^-23</h3>
                <h3 id="timeScaleNum">TimeScale: 10^-23</h3>

            </div>

            <div className ="sliderContainer">



                <div className ="sliderWithTicks" id="timeSliderWithTicks">

                    <div className ="ticks" id="leftTicks" style={leftTicks}>

                        <legend id="timeScaleTitle">TimeScale</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>
                        <legend className ="tick">|</legend>

                    </div>

                    <div className ="slider">
                      <VerticalSlider /> 
                    </div>
                </div>




              <div className ="sliderWithTicks" id="fpsSliderWithTicks">


                  <div className ="slider">
                    <VerticalSlider /> 
                  </div>

                  <div className ="ticks" id="leftTicks" style={rightTicks}>

                      <legend id="fpsScaleTitle">FPS</legend>
                      <legend className ="tick">| 160</legend>
                      <legend className ="tick">| 140</legend>
                      <legend className ="tick">| 120</legend>
                      <legend className ="tick">| 100</legend>
                      <legend className ="tick">| 80</legend>
                      <legend className ="tick">| 60</legend>
                      <legend className ="tick">| 40</legend>
                      <legend className ="tick">| 20</legend>

                  </div>

              </div>
            </div>
        </div>

        <div className ="data">

            <header className ="simSelector">

                <button className ="dropdown">
                    <h1>
                        Particle Sim
                    </h1>
                </button>

                <div className ="dropdown-content">
                    <a href="/SIMs/waveParticleSim/waveParticleSim.html"><h2>Wave Particle Sim</h2></a>
                    <a href="/SIMs/ropeSim/ropeSim.html"><h2>Rope Sim</h2></a>
                </div>
                    
            </header>

            <div className ="simData">

                <button>

                </button>

                <button>

                </button>

                <button>
                    
                </button>
                
            </div>

        </div>

      </div>

    
  );
}

export default App;