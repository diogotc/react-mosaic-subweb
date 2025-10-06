import { Input, Radio } from "sbwb-ds";

export function ComponentB() {
  return (
    <div className="flex flex-col gap-4 h-full p-6 overflow-auto">
      <div className="flex gap-4">
        <Input size="Small" label="InputA" />
        <Input size="Small" label="InputB" />
        <Input size="Small" label="InputC" />
      </div>
      <div className="flex gap-4 w-[32%]">
        <Input size="Small" label="InputD" disabled value="300,00" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">Label1</p>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1" justifyContent="center">
            <Radio size="Medium" label="RadioA" />
            <div className="flex gap-4">
              <Input size="Small" label="InputG" />
              <Input size="Small" label="InputH" />
            </div>
          </div>
          <div className="flex flex-col gap-1" className="border-l pl-4">
            <div className="flex flex-col gap-1" justifyContent="center">
              <Radio size="Medium" label="RadioB" />
              <div className="flex gap-4">
                <Input
                  size="Small"
                  label="InputJ"
                  placeholder="Valor será calculado"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">Label</p>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1" justifyContent="center">
            <Radio size="Medium" label="RadioC" />
            <div className="flex gap-4">
              <Input size="Small" label="InputK" />
              <Input size="Small" label="InputL" />
            </div>
          </div>
          <div className="flex flex-col gap-1" className="border-l pl-4">
            <div className="flex flex-col gap-1" justifyContent="center">
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
  );
}
