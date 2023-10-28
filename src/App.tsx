import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { TServer, TServerResponse } from './utils/types';
import { useFilter, usePagination } from './utils/hooks';
import Pagination from './components/Pagination';
import Filters from './components/Filters';
import { FILTER_CONFIG, INITIAL_PAGINATION_CONFIG } from './utils/config';
import { fetchServers } from './utils/api';

function App() {
  const [servers, setServers] = useState<TServer[]>([]);
  const { pagination, setPaginationData, setCurrentPage } = usePagination<TServer>(
    INITIAL_PAGINATION_CONFIG,
  );
  const { setFilter, filteredData: filteredServers } = useFilter<TServer>(
    servers,
    FILTER_CONFIG,
  );

  useEffect(() => {
    const getServers = async () => {
      const response = await fetchServers();

      const handledValue = handleServersResponseValue(response);

      setServers(handledValue);
    };

    getServers();
  }, []);

  useEffect(() => {
    setPaginationData(filteredServers);
  }, [filteredServers]);
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
                <Filters setFilters={setFilter} fields={FILTER_CONFIG} />
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
