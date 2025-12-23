import { checkConnection } from "./services/api";

const button = document.getElementById("check-btn") as HTMLButtonElement;
const status = document.getElementById("status") as HTMLDivElement;

button.onclick = async () => {
  status.innerText = "Checking...";
  try {
    const result = await checkConnection();
    status.innerText = `Server status: ${result}`;
  } catch {
    status.innerText = "Connection failed";
  }
};
