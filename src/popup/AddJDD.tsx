import { ChangeEvent, useState, useReducer } from "react";

enum ActionsType {
  SET_LOGIN,
  SET_PWD,
  SET_DESCRIPTION,
  SET_TAGS,
  RESET,
}

type Action = {
  type: ActionsType;
  value: string;
};

const initialState = {
  login: {
    value: "",
    isDirty: false,
  },
  pwd: {
    value: "",
    isDirty: false,
  },
  description: {
    value: "",
    isDirty: false,
  },
  tags: {
    value: [],
    isDirty: false,
  },
};

type State = typeof initialState;

const update = (state: State, field: keyof State, newValue: string) => {
  return {
    ...state,
    [field]: {
      value: newValue,
      isDirty: true,
    },
  };
};

const reducer = (state: State, action: Action): State | never => {
  switch (action.type) {
    case ActionsType.SET_LOGIN:
      return update(state, "login", action.value);
    case ActionsType.SET_PWD:
      return update(state, "pwd", action.value);
    case ActionsType.SET_DESCRIPTION:
      return update(state, "description", action.value);
    case ActionsType.SET_TAGS:
      return update(state, "tags", action.value);
    case ActionsType.RESET:
      return initialState;
    default:
      return state;
  }
};

export const StringInput = ({ name, state, onChange }: any) => {
  return (
    <label style={{ display: "flex", gap: "10px" }}>
      {name} :
      <input type="text" value={state.value} onChange={onChange} />
    </label>
  );
};

export const AddJDD = ({ addToCollection }: any) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const addData = (ev: any) => {
    ev.preventDefault();
    const newJDD = {
      login: state.login.value,
      pwd: state.pwd.value,
      description: state.description.value,
    };

    console.log({ newJDD });
    addToCollection(newJDD);
    dispatch({ type: ActionsType.RESET, value: "" });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Add JDD</div>
        {displayForm ? (
          <button onClick={() => setDisplayForm(false)}> Close</button>
        ) : (
          <button onClick={() => setDisplayForm(true)}>Add JDD</button>
        )}
      </div>
      {displayForm ? (
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <StringInput
            name="login"
            state={state.login}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: ActionsType.SET_LOGIN, value: ev.target.value });
            }}
          />

          <StringInput
            name="pwd"
            state={state.pwd}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: ActionsType.SET_PWD, value: ev.target.value });
            }}
          />

          <StringInput
            name="description"
            state={state.description}
            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: ActionsType.SET_DESCRIPTION,
                value: ev.target.value,
              });
            }}
          />

          <input type="submit" value="Add" onClick={addData} />
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
