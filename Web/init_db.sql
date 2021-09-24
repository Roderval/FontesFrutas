INSERT INTO `bancomestrado`.`frutas`
(`id_fruta`,
`nome_fruta`,
`cultivar_fruta`,
`lote_fruta`,
`safra_fruta`,
`colheita_fruta`,
`datacad_fruta`,
`status_fruta`)
VALUES
(1,
'maca',
'sim',
'a',
'a',
"2019-02-02",
"2019-02-02",
'boa');

INSERT INTO `bancomestrado`.`frutas`
(`id_fruta`,
`nome_fruta`,
`cultivar_fruta`,
`lote_fruta`,
`safra_fruta`,
`colheita_fruta`,
`datacad_fruta`,
`status_fruta`)
VALUES
(2,
'banana',
'sim',
'b',
'b',
"2019-02-02",
"2019-02-02",
'boa');

INSERT INTO `bancomestrado`.`frutas`
(`id_fruta`,
`nome_fruta`,
`cultivar_fruta`,
`lote_fruta`,
`safra_fruta`,
`colheita_fruta`,
`datacad_fruta`,
`status_fruta`)
VALUES
(3,
'pera',
'sim',
'c',
'c',
"2019-02-02",
"2019-02-02",
'boa');

INSERT INTO `bancomestrado`.`frutas`
(`id_fruta`,
`nome_fruta`,
`cultivar_fruta`,
`lote_fruta`,
`safra_fruta`,
`colheita_fruta`,
`datacad_fruta`,
`status_fruta`)
VALUES
(4,
'melancia',
'sim',
'd',
'd',
"2019-02-02",
"2019-02-02",
'boa');

INSERT INTO `bancomestrado`.`usuarios`
(`id_usuario`,
`nome_usuario`,
`cargo_usuario`,
`identificador_usuario`,
`senha_usuario`,
`datacad_usuario`,
`status_usuario`)
VALUES
(1,
'Luan',
'Estudante',
'luanlorenzo',
'123',
"2019-02-02",
'on');

INSERT INTO `bancomestrado`.`usuarios`
(`id_usuario`,
`nome_usuario`,
`cargo_usuario`,
`identificador_usuario`,
`senha_usuario`,
`datacad_usuario`,
`status_usuario`)
VALUES
(2,
'edu',
'Estudante',
'edu',
'123',
"2019-02-02",
'on');

INSERT INTO `bancomestrado`.`usuarios`
(`id_usuario`,
`nome_usuario`,
`cargo_usuario`,
`identificador_usuario`,
`senha_usuario`,
`datacad_usuario`,
`status_usuario`)
VALUES
(3,
'joao',
'eng',
'jao_eng',
'123',
"25/02/2012",
'on');

INSERT INTO `bancomestrado`.`usuarios`
(`id_usuario`,
`nome_usuario`,
`cargo_usuario`,
`identificador_usuario`,
`senha_usuario`,
`datacad_usuario`,
`status_usuario`)
VALUES
(4,
'tiagu',
'padeiro',
'opadeiro',
'123',
"23/02/2012",
'on');

-- SEED CAMARAS

INSERT INTO `bancomestrado`.`camaras`
(`id_camara`,
`posicao_camara`,
`tamanho_camara`,
`datacad_camara`,
`status_camara`)
VALUES
(1,
'LEFT',
'2',
03-23-2004,
'ON');

INSERT INTO `bancomestrado`.`camaras`
(`id_camara`,
`posicao_camara`,
`tamanho_camara`,
`datacad_camara`,
`status_camara`)
VALUES
(2,
'RIGHT',
'2',
04-23-2004,
'ON');

INSERT INTO `bancomestrado`.`camaras`
(`id_camara`,
`posicao_camara`,
`tamanho_camara`,
`datacad_camara`,
`status_camara`)
VALUES
(3,
'MID',
'2',
03-02-2004,
'ON');

INSERT INTO `bancomestrado`.`camaras`
(`id_camara`,
`posicao_camara`,
`tamanho_camara`,
`datacad_camara`,
`status_camara`)
VALUES
(4,
'MID',
'3',
2018-03-02,
'ON');



-- SEED ACTIVITIES

INSERT INTO `bancomestrado`.`atividades`
(`id_atividade`,
`modoop_atividade`,
`setpointO2_atividade`,
`setpointCO2_atividade`,
`datainicial_atividade`,
`datafinal_atividade`,
`datacad_atividade`,
`status_atividade`,
`usuarios_id_usuario`,
`frutas_id_fruta`,
`camaras_id_camara`)
VALUES
(1,
'ativo',
'point_A',
'point_B',
02-23-2019,
02-23-2019,
02-23-2019,
'ativo',
1,
1,
1);

INSERT INTO `bancomestrado`.`atividades`
(`id_atividade`,
`modoop_atividade`,
`setpointO2_atividade`,
`setpointCO2_atividade`,
`datainicial_atividade`,
`datafinal_atividade`,
`datacad_atividade`,
`status_atividade`,
`usuarios_id_usuario`,
`frutas_id_fruta`,
`camaras_id_camara`)
VALUES
(2,
2,
13.89,
14,87,
'2019-06-18 10:34:09',
'2018-07-18 10:34:09',
'2012-06-18 10:34:09',
3,
1,
2,
4);

INSERT INTO `bancomestrado`.`atividades`
(`id_atividade`,
`nome_atividade`,
`modoop_atividade`,
`setpointO2_atividade`,
`setpointCO2_atividade`,
`datainicial_atividade`,
`datafinal_atividade`,
`datacad_atividade`,
`status_atividade`,
`usuarios_id_usuario`,
`frutas_id_fruta`,
`camaras_id_camara`)
VALUES
(3,
'Atividade 3'
2,
23.49,
13,87,
'2019-06-18 10:34:09',
'2020-07-18 10:34:09',
'2019-06-18 10:34:09',
4,
1,
3,
2);

INSERT INTO `bancomestrado`.`atividades`
(`id_atividade`,
`nome_atividade`,
`modoop_atividade`,
`setpointO2_atividade`,
`setpointCO2_atividade`,
`datainicial_atividade`,
`datafinal_atividade`,
`datacad_atividade`,
`status_atividade`,
`usuarios_id_usuario`,
`frutas_id_fruta`,
`camaras_id_camara`)
VALUES
(4,
'Atividade 4'
2,
3.49,
3,07,
'2019-06-18 10:34:09',
'2020-07-18 10:34:09',
'2019-06-18 10:34:09',
4,
1,
2,
2);
  