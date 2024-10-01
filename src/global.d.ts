export {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: {
      connect: (options: { name: string }) => {
        init: (state: any) => void;
        send: (action: string, state: any) => void;
        subscribe: (listener: (message: any) => void) => void;
      };
    };
  }
}
