const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            usuario: "",
            permiso: false,
            nombre: "",
            demo: [{
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({
                        message: data.message,
                    });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({
                    demo: demo,
                });
            },
            login: (email, password) => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    email: email,
                    password: password,
                });

                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        setStore({
                            nombre: result.nombre,
                        });
                        sessionStorage.setItem("token", result.token);
                        sessionStorage.setItem("nombre", result.nombre);
                    })
                    .catch((error) => console.log("error", error));
            },
            logout: () => {
                const store = getStore();
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("nombre");

                store.permiso = false;
            },

            registro: (nombre, email, password) => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    name: nombre,
                    email: email,
                    password: password,
                });

                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch(process.env.BACKEND_URL + "/api/registro", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result.msg);
                        setStore({
                            usuario: result.msg,
                        });
                    })
                    .catch((error) => console.log("error", error));
            },

            existe: (email) => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    email: email,
                });

                var requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch(process.env.BACKEND_URL + "/api/existe", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        setStore({
                            usuario: result.msg,
                        });
                    })
                    .catch((error) => console.log("error", error));
            },
            privado: () => {
                var myHeaders = new Headers();
                myHeaders.append(
                    "Authorization",
                    `Bearer ${sessionStorage.getItem("token")}`
                );

                var requestOptions = {
                    method: "GET",
                    headers: myHeaders,

                    redirect: "follow",
                };

                fetch(process.env.BACKEND_URL + "/api/privada", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        setStore({
                            permiso: result.permiso,
                            nombre: result.nombre,
                        });
                    })
                    .catch((error) => console.log("error", error));
            },
        },
    };
};

export default getState;