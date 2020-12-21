import { renderHook } from "@testing-library/react-hooks";
import useFetch from "./useFetch";

export const url1 = "http://mock";
export const url2 = "http://mock2";

export const data1 = { id: 1 };
export const data2 = { id: 2 };

describe("useFetch performs GETs", () => {
  test(`GET ${url1}`, async () => {
    const initialValue = "initial value";
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url1, initialValue)
    );
    expect(result.current.data).toEqual("initial value");
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.data).toMatchObject(data1);
    expect(result.current.loading).toBeFalsy();
  });

  test(`GET ${url2}`, async () => {
    const initialValue = "initial value 2";
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url2, initialValue)
    );
    expect(result.current.data).toEqual(initialValue);
    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.data).toMatchObject(data2);
    expect(result.current.loading).toBeFalsy();
  });
});
