import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const USER_URL = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  email: string;
}

const Task1_APIFetchWithSearchPractice = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  //   const isMounted = useRef(true);

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  /* 
    - Fetch users, store it in state
    - Render them flatlist
    - Add a search bar
    */

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // isMounted.current = true;
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(USER_URL, { signal });
        if (!response.ok) throw Error("No response");
        const users = await response.json();

        // While fetching what if component unmounts, we need to address that
        // One way to do that is by using useRef, and then check if ref is not null then set it - refer to jobs api
        // if (isMounted.current) {
        //   setUsers(users);
        // }

        setUsers(users);

        console.log(JSON.stringify(users, null, 2));
        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
            return;
          }
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // return () => {
    //   isMounted.current = false;
    // };

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search user..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        style={styles.list}
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Task1_APIFetchWithSearchPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 4,
  },
  listItem: {
    backgroundColor: "#eaeaea",
    borderRadius: 4,
    marginVertical: 2,
    padding: 16,
    gap: 2,
  },
  listItemText: {
    fontWeight: "700",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textInput: {
    padding: 4,
  },
});
