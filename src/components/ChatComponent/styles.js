import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
  container: { flex: 1, padding: 1 },
  chatList: { flex: 1, marginBottom: 80 },
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
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 3,
    position: 'relative',
  },
  myMessage: {
    backgroundColor: '#DCF8C6', // verde claro típico do WhatsApp
    alignSelf: 'flex-end',
    borderBottomRightRadius: 8, // cantinho cortado
  },
  otherMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  messageText: { fontSize: 16, color: "#000", paddingHorizontal: 10 },
  timestamp: {
    fontSize: 11,
    color: '#777',
    alignSelf: 'flex-end',       // posiciona no canto direito
    marginTop: 4,
  },
  header: {
    width: '100%',
    height: 100,
    marginTop: '1%',
    borderWidth: 2,
    borderColor: '#000',
    borderBottomWidth: 3,
    borderBottomColor: '#999',

  },
  buttonStyle: {
    width: "100%",
    alignItems: 'center',
    justifyContent: "space-around",
    flexDirection: "row",        // centraliza horizontalmente o LinearGradient
    paddingHorizontal: 20,
    paddingTop:20,
    paddingBottom:10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,    
  },
  friendImageProfile: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50
  },
  headerText: {
    marginHorizontal: 8,
    padding: 10,
    width: '70%',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',    
  },
  buttonText: {
    height: 60,
    // marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextgoback: {
     marginRight: 10,        
  }
});


