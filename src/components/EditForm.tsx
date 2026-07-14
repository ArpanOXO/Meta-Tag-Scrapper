"use client";

import { useMemo, useState } from "react";
import { EDITABLE_FIELD_META, FIELD_GROUPS, type EditableMeta, type FieldGroupId } from "../types/meta";
import { Field } from "./ui/Field";
import { Panel } from "./ui/Panel";

interface EditFormProps {
  meta: EditableMeta;
  onChange: (next: EditableMeta) => void;
}

export function EditForm({ meta, onChange }: EditFormProps) {
  const [activeGroup, setActiveGroup] = useState<FieldGroupId>("basics");
  const activeGroupInfo = FIELD_GROUPS.find((g) => g.id === activeGroup)!;

  const fieldsForGroup = useMemo(
    () => EDITABLE_FIELD_META.filter((f) => f.group === activeGroup),
    [activeGroup]
  );

  function update(key: keyof EditableMeta, value: string) {
    onChange({ ...meta, [key]: value });
  }

  return (
    <Panel title="Edit your tags" description={activeGroupInfo.description}>
      <div className="mb-3 flex gap-1 border-b border-line pb-3">
        {FIELD_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActiveGroup(group.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeGroup === group.id ? "bg-brand text-white" : "bg-bg text-ink-soft hover:text-ink"
            }`}
          >
            {group.title}
          </button>
        ))}
      </div>

      <div>
        {fieldsForGroup.map((field) => (
          <Field
            key={field.key}
            label={field.label}
            hint={field.hint}
            value={meta[field.key]}
            multiline={field.multiline}
            onChange={(value) => update(field.key, value)}
          />
        ))}
      </div>
    </Panel>
  );
}
