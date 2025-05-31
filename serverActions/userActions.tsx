'use server'
export const getUsersAction = async (name: string | undefined) => {
  let searchQuery = '';
  if (name) {
    searchQuery = `?name=${name}`;
  }
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users${searchQuery}`
  );

  // Check if the response is OK (status 200-299)
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const users = await response.json(); // This gives you the actual data
  
  return users;
};

export const updateUserAction = async (
  id: number,
  updatedData: { name: string; email: string }
) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};