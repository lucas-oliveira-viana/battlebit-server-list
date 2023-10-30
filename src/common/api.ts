async function fetchServers() {
    return await fetch(
        'https://publicapi.battlebit.cloud/Servers/GetServerList',
    ).then(response => response.json())
}

export { fetchServers }