import api from "./api";



export const getConfigurations = async (
  params = {}
) => {
  const response = await api.get(
    "/configurations",
    {
      params,
    }
  );

  return response.data;
};



export const getConfigurationById =
  async (id) => {
    if (!id) {
      throw new Error(
        "Configuration ID is required."
      );
    }

    const response =
      await api.get(
        `/configurations/${id}`
      );

    return response.data;
  };



export const createConfiguration =
  async (payload) => {
    const response =
      await api.post(
        "/configurations",
        payload
      );

    return response.data;
  };



export const updateConfiguration =
  async (
    id,
    payload
  ) => {
    if (!id) {
      throw new Error(
        "Configuration ID is required."
      );
    }

    const response =
      await api.put(
        `/configurations/${id}`,
        payload
      );

    return response.data;
  };