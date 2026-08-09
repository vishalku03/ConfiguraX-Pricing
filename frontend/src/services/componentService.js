import api from "./api";


export const getComponents = async (
  params = {}
) => {
  const response = await api.get(
    "/components",
    {
      params,
    }
  );

  return response.data;
};


export const getComponentById = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Component ID is required."
    );
  }

  const response = await api.get(
    `/components/${id}`
  );

  return response.data;
};



export const createComponent = async (
  payload
) => {
  const response = await api.post(
    "/components",
    payload
  );

  return response.data;
};



export const updateComponent = async (
  id,
  payload
) => {
  if (!id) {
    throw new Error(
      "Component ID is required."
    );
  }

  const response = await api.put(
    `/components/${id}`,
    payload
  );

  return response.data;
};



export const deleteComponent = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Component ID is required."
    );
  }

  const response = await api.delete(
    `/components/${id}`
  );

  return response.data;
};



export const activateComponent = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Component ID is required."
    );
  }

  const response = await api.patch(
    `/components/${id}/activate`
  );

  return response.data;
};



export const deactivateComponent = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Component ID is required."
    );
  }

  const response = await api.patch(
    `/components/${id}/deactivate`
  );

  return response.data;
};



export const getComponentPriceHistory =
  async (id) => {
    if (!id) {
      throw new Error(
        "Component ID is required."
      );
    }

    const response =
      await api.get(
        `/components/${id}/history`
      );

    return response.data;
  };