const express = require('express');
const neo4j = require('neo4j-driver');
const app = express();
const port = 9090;

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'GJyg6841!'));
const session = driver.session();

app.get('/api/graph', async (req, res) => {
  try {
    const result = await session.run('MATCH (n)-[r]->(m) RETURN n,r,m');
    const nodes = [];
    const links = [];

    result.records.forEach(record => {
      record._fields.forEach(field => {
        if (field.labels) { // 判断是否是节点
          nodes.push({
            id: field.identity.toString(),
            name: field.properties.name || field.properties.event_type,
            category: field.labels[0]
          });
        } else { // 判断是否是关系
          links.push({
            source: field.start.toString(),
            target: field.end.toString(),
            type: field.type
          });
        }
      });
    });

    res.json({ nodes, links });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
