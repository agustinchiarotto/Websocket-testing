import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';

let mensaje = [];
let port = 12345;
let ip = '0.0.0.0'

export const server = TcpSocket.createServer(function(socket) {
  socket.on('data', (data) => {
    mensaje.push("\nSocket recibe datos: ",data)
    socket.write('Echo server', data);
  });

  console.log("socket> ",socket)
 
  socket.on('error', (error) => {
    mensaje.push("\nOcurrio un error ",error)
    console.log('An error ocurred with client socket ', error);
  });
 
  socket.on('close', (error) => {
    mensaje.push("\nSe cerro la conexion ")
    console.log('Closed connection with ', socket.address());
  });
})

mensaje.push("\nServidor creado ")
server.listen(port, ip , (address) => {
   mensaje.push("\nNueva conexion entrante desde ",JSON.stringify(address))
}); 

mensaje.push("\nServidor escuchando en:  ",ip,":",port)
 
server.on('error', (error) => {
  mensaje.push("\nOcurrio un error ",error)
  console.log('An error ocurred with the server', error);
});
 
server.on('close', () => {
  mensaje.push("\nSe cerro la conexion ")
  console.log('Server closed connection');
});


export default function App() {

  
  return (
    <View style={styles.container}>
   
      <View>
            <Text>
               {mensaje}
            </Text>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
