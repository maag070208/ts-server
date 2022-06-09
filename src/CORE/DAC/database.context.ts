import { connect, connection } from "mongoose";

class Connection {
  public async connectToMongodb() {
    try {
      await connect("mongodb://localhost:27017");
    } catch (error) {
      console.log("Error:", error);
    }
  }
}
connection.on("connected", () => {
  console.log("Mongodb connected to:", connection.db.databaseName);
});

connection.on("error", (error) => {
  console.error("error", error);
});

connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

export const connectionDB = new Connection;