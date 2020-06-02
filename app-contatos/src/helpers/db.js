import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("contatos.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS tb_contatos(id INTEGER PRIMARY KEY, nome TEXT NOT NULL, numero TEXT NOT NULL, imagem TEXT NOT NULL);",
                [],
                () => { resolve() },
                (_, err) => { reject(err) }
            )
        })
    });

    return promise;
}

export const inserirContato = (nome, numero, imagemUri) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO tb_contatos (nome, numero, imagem) VALUES (?,?,?)',
                [nome, numero, imagemUri],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            );
        });
    });
    return promise;
}

export const listarContatos = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM tb_contatos',
                [],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            );
        });
    });
    return promise;
}

export const deletarContato = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM tb_contatos WHERE id = ?',
                [id],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            );
        });
    });
    return promise;
}

export const atualizarContato = (nome, numero, imagemUri, id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE tb_contatos SET nome = ?, numero = ?, imagem = ? WHERE id = ?',
                [nome, numero, imagemUri, id],
                (_, resultado) => { resolve(resultado) },
                (_, err) => { reject(err) }
            );
        });
    });
    return promise;
}