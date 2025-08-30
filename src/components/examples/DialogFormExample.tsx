'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DialogForm } from '@/components/ui/dialog-form';
import { useToast } from '@/lib/hooks/useToast';

export function DialogFormExample() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simular uma operação assíncrona
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Formulário enviado com sucesso!', {
      description: `Dados: ${formData.name}, ${formData.email}`,
    });
    
    setLoading(false);
    setOpen(false);
    setFormData({ name: '', email: '', description: '' });
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', description: '' });
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>
        Abrir Formulário em Modal
      </Button>

      <DialogForm
        open={open}
        onOpenChange={setOpen}
        title="Criar Novo Item"
        description="Preencha os campos abaixo para criar um novo item."
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        size="lg"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Digite o email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Digite a descrição"
              rows={4}
            />
          </div>
        </div>
      </DialogForm>
    </div>
  );
}
