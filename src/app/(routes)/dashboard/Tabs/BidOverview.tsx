import BidChart from "../Charts/BidChart";

export default function BidOverview() {
  const bidData = [
    { date: "Mar 1", bid: 120 },
    { date: "Mar 2", bid: 200 },
    { date: "Mar 3", bid: 150 },
    { date: "Mar 4", bid: 300 },
    { date: "Mar 5", bid: 250 },
    { date: "Mar 6", bid: 400 },
    { date: "Mar 7", bid: 350 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-card-foreground">
        Daily Bid Performance
      </h2>
      <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 shadow-sm">
        <BidChart data={bidData} />
      </div>
    </div>
  );
}
