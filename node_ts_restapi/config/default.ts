export default {
  port: 5000,
  dbUri:
    "mongodb+srv://fella:fella@node.rspo1.mongodb.net/db-node-ts?retryWrites=true&w=majority",
  salt: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXgIBAAKBgQC17sPfG+f847Tc/lj2Bw1UJ8AGZUk7agFU2N9WH9vdqvwytARy
  ywdL7x26tD/jjelBADpoO3QC6UBFempFvFLlkKzoO99Iylse15bdYFj0bMGuznFA
  VoIJ3N/d8pgL4UGy9ukIP0dYKq5qWvGqLdHyc7T2HW+8PUql5feOJv83hwIDAQAB
  AoGBAIKLq30Clzp9YiBZWhhgAw5p3343W48Ih6AMZmV0Qt4SfRkc1zxPtxKjp996
  y4VLJR6BPWfhkWMtX/L63hrgAVKGfMaRk+hYA4ORGwyhItwnZ/HNN4+1D+NF32ij
  HWr9CA9yF0OOD43XPnJ1IoIomdz1XQyYywWY8yqoSX17NMBRAkEA5Jx28sJyWkGT
  RsV4LGH+baIy0Gi/skPapEmDLWKDmEixPR9ZfYFPoDJzt+1PbLlZy35D3KDko3AZ
  1EwylApuBQJBAMu6qg/+ZXf46A1sUPvUvr2XC5qv+G8zZJ130q73KCJe1fe5Ni41
  PWKOz7zZF0974fer2NbzMZkWYGmpf0gUuRsCQCfEL8y6ljms/nlpECZoRWG8vSoT
  joTr2LSLNQ5H/KwYuPvw4Bg8ziUHoal01kQLWdtT82oFcsAbV+Ld/k5SIiECQQCi
  k8ygxMeejOBJzfV2cdjhHQdioyjjPKT/UJ6th4jcnMetT30gNNZOr16x+qAyis7R
  wa5iImKjIws/Zsau8/KfAkEAoWRh/QLdp/wzJhbwtHuJ4sVfSdqTzF1VJUaKcnOZ
  9I4uVn2Z2KJWrUn9uCemG5U3LP7BwFcbYenLNcbO2xDJsg==
  -----END RSA PRIVATE KEY-----`,
};
