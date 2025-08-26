import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chatList: { flex: 1 , marginBottom:80},
  inputArea: {
    flexDirection: 'col',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    color: "#000",
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical:8,
    marginHorizontal:12,
    borderRadius: 14,
    justifyContent:"space-around",
    maxWidth: '90%',
  },
  myMessage: {
    backgroundColor: '#d9fdd3',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: { fontSize: 16, color: "#000", paddingHorizontal:10 },
  timestamp: { fontSize: 10, color: '#666', marginTop: 4, padding:15 },
  header: {
    height: 60,
    backgroundColor: '#577cccff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#999',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


