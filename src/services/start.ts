"use client";

import { baseurl } from "@/utils/const";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useStart() {
  return useQuery({
    queryKey: ["start"],
    queryFn: async () => {
      return axios.get(baseurl);
    },
    refetchOnWindowFocus: false,
  });
}
