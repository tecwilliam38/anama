import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chatList: { flex: 1 },
  inputArea: {
    flexDirection: 'col',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    color:"#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#d1fcd3',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: { fontSize: 16, color:"#000" },
  timestamp: { fontSize: 10, color: '#666', marginTop: 4 },
});


