import { Input, Radio } from "sbwb-ds";

export function ComponentB() {
  return (
    <div className="bg-white h-full w-full">
      <div className="flex flex-col gap-4 p-6 overflow-auto">
        <div className="flex gap-4">
          <Input size="Small" label="InputA" />
          <Input size="Small" label="InputB" />
          <Input size="Small" label="InputC" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold">Label</p>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 justify-between">
              <Radio size="Medium" label="RadioC" />
              <div className="flex gap-4">
                <Input size="Small" label="InputK" />
                <Input size="Small" label="InputL" />
              </div>
            </div>
            <div className="flex flex-col gap-1 border-l pl-4">
              <div className="flex flex-col gap-1 justify-between">
                <Radio size="Medium" label="RadioD" />
                <div className="flex gap-4">
                  <Input
                    size="Small"
                    label="InputM"
                    placeholder="Valor será calculado"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
