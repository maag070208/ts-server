declare class Connection {
    connectToMongodb(): Promise<void>;
}
export declare const connectionDB: Connection;
export {};
