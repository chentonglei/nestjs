import { Controller, Dependencies, Get, Post } from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('/admin')
@Dependencies(AdminService)
export class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }
  @Post()
  getHello() {
    return this.adminService.getHello();
  }
}
