import axios from "axios";
import { QueryFunctionContext, useQuery } from 'react-query';

async function fetchPlanetList() {
  return axios.get("/api/planets");
}

async function fetchPlanetDetail({ queryKey }: QueryFunctionContext) {
  const [, id] = queryKey;
  return axios.get(`/api/planets/${id}`);
}


export function usePlanetList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["planets"],
    queryFn: fetchPlanetList,
  });

  return { data: data?.data.planets, isLoading, isError };
}

export function usePlanetDetail(id: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["planets", id],
    queryFn: fetchPlanetDetail,
  });

  return { data: data?.data.planet, isLoading, isError };
}

