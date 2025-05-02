const inflight = new Map();
const timeouts = new Map();

function handleJoin(msg, config, node, onComplete) {
  const groupId = msg.topic;
  const expected = msg.expectNumberCountsOutput;

  if (msg.reset) {
    console.log("RESET ----------------------------------");
    inflight.delete(groupId);
    clearTimeout(timeouts.get(groupId));
    timeouts.delete(groupId);
    return false;
  }

  console.log(`Topic ${msg.topic}`);
  console.log("To aqui");
  console.log(`tem ou não ${inflight.has(groupId)}`);
  console.log(`expected ${expected}`);
  console.log(`groupId ${groupId}`);
  console.log("----------------------------------------------");
  console.log("Timeouts:", Array.from(timeouts.entries()));
  if (!inflight.has(groupId)) {
    inflight.set(groupId, []);
    time = config.timeout || 1;
    timeouts.set(
      groupId,
      setTimeout(() => {
        if (!msg.wiresTo) {
          node.warn(`Timeout no grupo ${groupId}`);
          const list = inflight.get(groupId) || [];
          inflight.delete(groupId);
          timeouts.delete(groupId);
          onComplete(list); // Executa a logica do node
        }
      }, time * 1000),
    );
    console.log("Timeouts:", Array.from(timeouts.entries()));
  }

  const list = inflight.get(groupId);
  list.push(msg);

  // possibilita o recebimento do complete
  const isComplete = list.length >= expected || msg.complete === true;
  if (isComplete) {
    console.log("Complete ----------------------------------");
    clearTimeout(timeouts.get(groupId));
    timeouts.delete(groupId);
    inflight.delete(groupId);
    onComplete(list); // Executa a logica do node
    return true;
  }

  return false;
}

function clearAll() {
  console.log("Clear ----------------------------------");
  inflight.clear();
  timeouts.forEach((t) => clearTimeout(t));
  timeouts.clear();
}

function buildTargetPath(basePath, indexes = []) {
  if (!basePath) throw new Error("Base path não informado.");

  if (!Array.isArray(indexes)) {
    throw new Error("Indexes deve ser um array.");
  }

  let path = basePath;

  indexes.forEach((index) => {
    if (typeof index === "string") {
      // Por exemplo: se quiser acessar "item.details"
      path += `.${index}`;
    } else if (typeof index === "number") {
      path += `[${index}]`;
    } else {
      throw new Error(`Index inválido: ${index}`);
    }
  });

  return path;
}

function insertAtPath(root, path, obj) {
  const parts = path.split(".").flatMap((part) => {
    const match = part.match(/([^\[\]]+)|(\[\d+\])/g);
    return match
      ? match.map((m) => (m.startsWith("[") ? Number(m.slice(1, -1)) : m))
      : [part];
  });
  console.log(`AQUI ESTA O PARTS ${parts}`);

  let result = root;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (typeof part === "string") {
      result = result[part];
    } else if (typeof part === "number") {
      result = result[part];
    }
  }
  if (result === undefined) {
    throw new Error(`Path inválido: falhou em "${result}"`);
  } else {
    if (Array.isArray(result)) {
      result.push(obj);
    } else {
      throw new Error(`Destino em ${JSON.stringify(result)} não é um array`);
    }
  }

  // console.log(`AQUI ESTA O PARTS ${JSON.stringify(root)}`);
  // for (let i = 0; i < parts.length - 1; i++) {
  //   current = current[parts[i]];
  //   if (current === undefined) {
  //     throw new Error(
  //       `Path inválido: falhou em "${parts.slice(0, i + 1).join(".")}"`,
  //     );
  //   }
  // }

  // const lastPart = parts[parts.length - 1];
  // console.log(`AQUI NO UTIL ${lastPart}`);
}

module.exports = {
  handleJoin,
  clearAll,
  buildTargetPath,
  insertAtPath,
};
