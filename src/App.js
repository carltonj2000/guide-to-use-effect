import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import "./App.css";
import useFetch from "./useFetch";

const EffectsContext = React.createContext({});

function Counter({ interval = 5000 }) {
  const [count, setCount] = useState(0);
  const { onDarkModeChange } = useContext(EffectsContext);
  useEffect(() => {
    const intervalTimer = setInterval(function () {
      onDarkModeChange && console.log(`useE ${onDarkModeChange()}`);
      setCount((prev) => prev + 1);
    }, interval);
    return () => {
      console.log("clean up");
      clearInterval(intervalTimer);
    };
  }, [interval, onDarkModeChange]);
  return <p>and the counter counts {count}</p>;
}

function EffectsDemoUnmount() {
  const [unmount, setUnmount] = useState(false);
  const renderDemo = () => !unmount && <Counter />;
  return (
    <div>
      <button onClick={() => setUnmount(true)}>Unmount child component</button>
      {renderDemo()}
    </div>
  );
}

function EffectsDemoProps() {
  const [interval, setInterval] = useState(2000);
  return (
    <div>
      <input
        type="text"
        value={interval}
        onChange={(evt) => setInterval(evt.target.value)}
      />
      <Counter {...{ interval }} />
    </div>
  );
}
function EffectsDemoCustomHook() {
  const { loading, data } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/"
  );
  return (
    <div className="App">
      {loading && <div className="loader" />}
      {/* for less screen output use idx below */}
      {data?.length > 0 &&
        data.map((blog, idx) => !idx && <p key={blog.id}>{blog.title}</p>)}
    </div>
  );
}

function EffectsDemoEffectConditional() {
  const [count, setCount] = useState(0);
  const [trackChecked, setTrackChecked] = useState(false);
  const shouldTrackRef = useRef(false);
  const infoTrackedRef = useRef(false);
  const trackInfo = (info) => console.log(info);
  useEffect(() => {
    console.log("useEffect");
    if (shouldTrackRef.current && !infoTrackedRef.current) {
      trackInfo("user found the button component");
      infoTrackedRef.current = true;
    }
  }, [count]);
  console.log("render");
  const handleClick = () => setCount((prev) => prev + 1);
  const handleCheckboxChange = () => {
    setTrackChecked((prev) => {
      shouldTrackRef.current = !prev;
      return !prev;
    });
  };
  return (
    <div>
      <p>
        <label htmlFor="tracking">Declaration of consent for tracking</label>
        <input
          name="tracking"
          type="checkbox"
          checked={trackChecked}
          onChange={handleCheckboxChange}
        />
      </p>
      <p>
        <button onClick={handleClick}>click me</button>
      </p>
      <p>User clicked {count} times</p>
    </div>
  );
}

function App() {
  console.log("render");
  const [title, setTitle] = useState("default title");
  const [darkMode, setDarkMode] = useState(false);
  const titleRef = useRef();
  const [numberClicks, setNumberClicks] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    document.title = title;
  }, [title]);
  useEffect(() => {
    console.log("uE local storage");
    const presistedTitle = localStorage.getItem("title");
    setTitle(presistedTitle || []);
  }, []);
  const onDarkModeChange = useCallback(() => {
    return darkMode ? "🌙" : "🌞";
  }, [darkMode]);
  return (
    <div className={"enter" + (darkMode ? " dark-mode" : "")}>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode((dm) => !dm)}
      />
      <input ref={titleRef} style={{ marginLeft: "1em" }} />
      <button onClick={() => setTitle(titleRef.current.value)}>Submit</button>

      {/* <h1>Clean Up Example</h1>
      <EffectsDemoUnmount /> */}

      {/* <h1>Props</h1>
      <EffectsContext.Provider value={{ onDarkModeChange }}>
        <EffectsDemoProps />
      </EffectsContext.Provider>
      <p>
        <button onClick={() => setNumberClicks((prev) => prev + 1)}>
          click
        </button>
        <span>&nbsp;Number clicks: {numberClicks}</span>
      </p> */}

      <h1>Data Fetch And Custom Hook</h1>
      <EffectsDemoCustomHook />

      <h1>Conditional Effects</h1>
      <EffectsDemoEffectConditional />
    </div>
  );
}

export default App;
