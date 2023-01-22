import { ChangeEvent, useCallback, useState } from "react";
import "./App.css";
import { CredsData } from "../typings";

const data = [
  {
    login: "0610101013",
    pwd: "test1234",
    description: "some description",
    keywords: ["a", "b"],
  },
];

function App() {
  const [filterValue, setFilterValue] = useState("");
  const handleFilterClick = (ev: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(ev.target.value);
  };

  const handleApplyBtn = useCallback(async (data: CredsData) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    tab?.id && chrome.tabs.sendMessage(tab.id, { sendBack: true, data });
  }, []);

  return (
    <>
      <h5>Liste de JDD</h5>
      <label htmlFor="filtre-jdd">
        Filtre :
        <input
          type="text"
          id="filtre-jdd"
          name="filtre-jdd"
          placeholder="Enter keyword"
          value={filterValue}
          onChange={handleFilterClick}
        />
      </label>
      <hr />
      <div style={{ display: "flex" }}>
        <table>
          <thead>
            <tr>
              <th>login</th>
              <th>password</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ login, pwd, description }) => (
              <tr key={login}>
                <td>{login}</td>
                <td>{pwd}</td>
                <td>{description}</td>
                <td>
                  <button
                    onClick={() => handleApplyBtn({ login, pwd })}
                  ></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
