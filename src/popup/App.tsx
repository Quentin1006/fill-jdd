import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { AddJDD } from "./AddJDD";
import { CredsData } from "../typings";

const initialData = [
  {
    id: 1,
    login: "0610101013",
    pwd: "test1234",
    description: "some description",
    keywords: ["a", "b"],
  },
  {
    id: 2,
    login: "0610101015",
    pwd: "test1234",
    description: "some description 2",
    keywords: ["a", "c"],
  },
];

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([] as any);
  const handleFilterClick = (ev: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(ev.target.value);
  };

  const handleApplyBtn = useCallback(async (data: CredsData) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log({ tab, tabId: tab.id, data });
    tab?.id && chrome.tabs.sendMessage(tab.id, { sendBack: true, data });
  }, []);

  const addToCollection = (newJDD: any) => {
    const newData = [...data, newJDD];
    setData(newData);
    // for now we  dont wait for it to finish
    chrome.storage.local.set({ data: newData });
  };

  const removeFromCollection = ({ id }: any) => {
    const dataWithoutRemovedEl = data.filter((el: any) => el.id !== id);
    setData(dataWithoutRemovedEl);
    // for now we  dont wait for it to finish
    chrome.storage.local.set({ data: dataWithoutRemovedEl });
  };

  useEffect(() => {
    const getStorage = async () => {
      const { data } = (await chrome.storage.local.get(["data"])) as any;
      console.log({ dataFromStorage: data });
      if (!Array.isArray(data) || data.length === 0) {
        await chrome.storage.local.set({ data: initialData });
        console.log({ initialData });
        setData(initialData);
      } else {
        setData(data);
      }

      setLoading(false);
    };
    if (isLoading) {
      getStorage();
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <h4>Liste de JDD</h4>
      <AddJDD addToCollection={addToCollection} />
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
            {data.map(({ id, login, pwd, description }: any) => (
              <tr key={login}>
                <td>
                  <button onClick={() => removeFromCollection({ id })}>
                    x
                  </button>
                </td>
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
