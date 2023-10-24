export const GetApi = async (url) => {
  const res = await fetch(url);
  const response = await res.json();
  return response;
};

export const DelApi = async (url) => {
    const res = await fetch(url,{
        method: "Delete",
    }
    );
    console.log(res);
    return res
  };

export async function PostApi(url, data) {;
    console.log(url,data);
  const response = await fetch(url,{
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  console.log(res);
  return res;
}

export async function PutApi(url, data) {
  console.log(url,data);
const response = await fetch(url,{
  method: "PUT",
  mode: "cors",
  body: JSON.stringify(data),
  headers: {
      "Content-Type": "application/json",
  },
});
const res = await response.json();
console.log(response.status);
return response.status;
}

export async function PostApiImage(url, data) {;
    console.log(url,data);
    const response = await fetch(url,{
    method: "POST",
    body: data,
    headers: {
        "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  console.log(res);
  return res;
}
