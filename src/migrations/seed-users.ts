// src/migrations/SeedUserDataAndUserPermission.ts

import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUserDataAndUserPermission1612345678901
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert data into UserData
    await queryRunner.query(`
      INSERT INTO user_data (id,empId, userName, password, createdDate, updatedDate, createdBy, updatedBy, isActive, userPermissionId, role) VALUES
      (1,'0000', 'varun', '$argon2id$v=19$m=65536,t=3,p=4$U+E4JkI+YAY3aYToSCukiw$Z/zsUEni4phm2ZYDxN3vY2Wps+khFTDlcuh82Ge/YRs', NOW(), NOW(), 1, 1, true,1, 'admin'),
      (2,'0001', 'yogesh', '$argon2id$v=19$m=65536,t=3,p=4$CvA/5uyBe2h/284IjTNzWw$PgCwAUdH1PE2Ui97UAb3qFnx85qDLCkITVer+rm0/Gk', NOW(), NOW(), 2, 2, true,2, 'admin');
    `);
    // varun66, varun88
    // Insert data into UserPermission
    await queryRunner.query(`
      INSERT INTO user_permission (userId, wt, u, tt, su, sr, sh, sb, rpt, qu, pt, prg, pr, pp, po, pln, pa, mg, jp, ip, id, emp, ds, d, cs, bf, attnds, ad) VALUES
      (1, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960),
      (2, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960, 960);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error(`Method not implemented. ${queryRunner}`);
  }
}

/*
id
empId
userName
password
createdDate
updatedDate
createdBy
updatedBy
isActive
userPermissionId  
*/
