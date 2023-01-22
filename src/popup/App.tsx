import { ChangeEvent, useCallback, useState } from "react";
import "./App.css";
import { AddJDD } from "./AddJDD";
import { CredsData } from "../typings";

const initialData = [
  {
    login: "0610101013",
    pwd: "test1234",
    description: "some description",
    keywords: ["a", "b"],
  },
  {
    login: "0610101015",
    pwd: "test1234",
    description: "some description 2",
    keywords: ["a", "c"],
  },
];

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState(initialData);
  const handleFilterClick = (ev: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(ev.target.value);
  };

  const handleApplyBtn = useCallback(async (data: CredsData) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log({ tab, tabId: tab.id, data });
    tab?.id && chrome.tabs.sendMessage(tab.id, { sendBack: true, data });
  }, []);

  const updateCollection = (newJDD: any) => {
    setData([...data, newJDD]);
  };

  return (
    <>
      <h4>Liste de JDD</h4>
      <AddJDD updateCollection={updateCollection} />
      <hr />
      <label htmlFor="filtre-jdd">
        Filtre : &nbsp;
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
                  <button onClick={() => handleApplyBtn({ login, pwd })}>
                    apply
                  </button>
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
