import { Button } from "sbwb-ds";

export function ComponentC() {
  return (
    <div className="flex flex-col gap-4 justify-between h-full p-6 overflow-auto">
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="p-2 text-left border">Company</th>
            <th className="p-2 text-left border">Contact</th>
            <th className="p-2 text-left border">Country</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(Array(10).keys()).map((n) => (
            <tr key={n}>
              <td className="p-2 text-left border">Alfreds Futterkiste</td>
              <td className="p-2 text-left border">Maria Anders</td>
              <td className="p-2 text-left border">Germany</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 self-end">
        <Button variant="secondary" size="Small" iconName="AddAnt">
          Adicionar
        </Button>
        <Button variant="primary" size="Small" disabled>
          Salvar
        </Button>
      </div>
    </div>
  );
}
