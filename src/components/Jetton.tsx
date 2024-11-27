import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { useTonBalance } from '../hooks/useTonBalance';
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

export function Jetton() {
  const { connected } = useTonConnect();
  const { mint, jettonWalletAddress, balance } = useFaucetJettonContract();
  const { balance: tonBalance } = useTonBalance();

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>Faucet Jetton</h3>
        <FlexBoxRow>
          TON Balance
          <div>{tonBalance ? `${fromNano(tonBalance)} TON` : "Loading..."}</div>
        </FlexBoxRow>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{jettonWalletAddress}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Balance
          <div>{balance ?? "Loading..."}</div>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          onClick={async () => {
            mint();
          }}
        >
          Get jettons from faucet
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
