import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { TPagination, TServer, TServerResponse } from './types';
import { usePagination } from './hooks';
import Pagination from './components/Pagination';
import Filters from './components/Filters';

const INITIAL_PAGINATION_CONFIG: TPagination<TServer> = {
  data: [],
  currentPage: 0,
  pageSize: 10,
  totalPages: 0,
};

function App() {
  const [servers, setServers] = useState<TServer[]>([]);
  const [filteredServers, setFilteredServers] = useState<TServer[]>([]);
  const { pagination, setPaginationData, setCurrentPage } = usePagination<TServer>(
    INITIAL_PAGINATION_CONFIG,
  );
  const [filters, setFilters] = useState();

  useEffect(() => {
    const fetchServers = async () => {
      const response = await fetch(
        'https://publicapi.battlebit.cloud/Servers/GetServerList',
      );

      const value = await response.json();

      const handledValue = handleServersResponseValue(value);

      setServers(handledValue);
      setFilteredServers(handledValue);
    };

    fetchServers();
  }, []);

  useEffect(() => {
    setPaginationData(filteredServers);
  }, [filteredServers]);

  useEffect(() => {

    if (filters) {
      let filteredData = servers;

      Object.entries(filters).forEach(([name, value]) => {
        filteredData = filteredData.filter((server) => {
          return (server[name as keyof TServer] as string)
            .toLowerCase()
            .includes((value as string).toLowerCase());
        });
      });

      setFilteredServers(filteredData);
      return;
    }

    setFilteredServers(servers);
  }, [filters]);

  function handleServersResponseValue(servers: TServerResponse[]) {
    return servers
      .map((server) => ({
        ...server,
        Players: `${server.Players}/${server.MaxPlayers} [${server.QueuePlayers}]`,
      }))
      .map(({ MaxPlayers, QueuePlayers, IsOfficial, HasPassword, ...rest }) => rest);
  }

  return (
    <div className="bg-black h-100 min-h-screen overflow-auto">
      <header className="h-20 flex justify-center items-center">
        <span className="text-white text-xl">BattleBit Server List</span>
      </header>
      <section className="min-w-full text-center">
        {servers.length ? (
          <div className="pl-12 pr-12 pb-12">
            {pagination.paginatedData && (
              <div className="flex flex-col gap-6">
                <Filters setFilters={setFilters} fields={Object.keys(servers[0])} />
                <div className="overflow-auto border-gray-300 border rounded-lg">
                  <Table
                    columns={Object.keys(servers[0])}
                    data={pagination.paginatedData[pagination.currentPage]}
                  ></Table>
                </div>

                <Pagination pagination={pagination} setCurrentPage={setCurrentPage} />
              </div>
            )}
          </div>
        ) : (
          <span className="text-white text-xl">Carregando...</span>
        )}
      </section>
    </div>
  );
}

export default App;
